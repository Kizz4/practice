#!/bin/bash
export LIBGL_ALWAYS_SOFTWARE=1

# ========== Global UI settings ==========
WIN_WIDTH=1000
WIN_HEIGHT=600

# ========== Helper Function ==========

show_exit_message() {
  if [ -z "$1" ]; then
    zenity --info --text="Goodbye 👋" --timeout=1 --width=$WIN_WIDTH
    exit 0
  fi
}

# ========== Main UI Functions ==========

show_main_menu() {
  choice=$(zenity --list \
    --title="Git Commit Assistant" \
    --width=$WIN_WIDTH --height=$WIN_HEIGHT \
    --column="Available Actions" \
    "Set status of a Project(s) or Repo(s)" \
    "Make a simple commit" \
    "Quit")
  show_exit_message "$choice"
  echo "$choice"
}

update_files(){

  if [ -z "$1" ]; then
    echo "Error: project name not provided."
    exit 1
  fi

  local project_name="$1"

  local BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

  local PHP_SCRIPT="$BASE_DIR/php_scripts/updateFiles.php"

  if [ ! -f "$PHP_SCRIPT" ]; then
    echo "Error: PHP script not found at $PHP_SCRIPT"
    return 1
  fi

  echo "Running $PHP_SCRIPT with project: $project_name"
  php "$PHP_SCRIPT" "$project_name"

  git add -A
  git commit -m "Update of README's files for $project_name"
}

set_project_status() {
  paths=$(zenity --file-selection --directory --multiple \
    --separator=":" \
    --filename="~/$(pwd)/" \
    --title="Select Project(s) or Repo(s)" \
    --width=$WIN_WIDTH --height=$WIN_HEIGHT)
  show_exit_message "$paths"

  IFS=":" read -ra dirArray <<< "$paths"
  selected=""
  for dir in "${dirArray[@]}"; do
    selected+="Project/Repo: $dir"$'\n\n'
  done

  zenity --question \
    --title="Confirm Selection?" \
    --text="You selected:\n\n$selected\n\n" \
    --width=$WIN_WIDTH --height=$WIN_HEIGHT
  if [ $? -ne 0 ]; then
    show_exit_message ""
  fi

  status=$(zenity --list \
    --radiolist \
    --title="Status Selection" \
    --width=$WIN_WIDTH --height=$WIN_HEIGHT \
    --column="Selected" --column="Status" --column="Description" \
    TRUE  "✅ Done"         "The project is complete" \
    FALSE "▶️ On Going"     "The project is still in progress" \
    FALSE "⏳ Not Started"  "The project hasn't started yet" \
    FALSE "Cancel"          "Cancel this action")
  show_exit_message "$status"

  if [ "$status" = "Cancel" ]; then
    show_exit_message ""
  fi

  git add -A
  git commit -m "Status '$status' set for:" -m "$selected"
  update_files $(basename "$PWD")
  git push

  zenity --info --text="Status '$status' set for:\n\n$selected" --width=$WIN_WIDTH
}

make_simple_commit() {
  msg=$(zenity --entry --title="Commit Message" --text="Enter your commit message:" --width=$WIN_WIDTH)
  show_exit_message "$msg"

  if [ -n "$msg" ]; then
    git add -A
    git commit -m "$msg"
    git push
    zenity --info --text="Commit created with message:\n\n$msg" --width=$WIN_WIDTH
  else
    zenity --warning --text="Empty commit message. Nothing was done." --width=$WIN_WIDTH
  fi
}


show_error() {
  zenity --error --text="No valid option selected." --width=$WIN_WIDTH
  exit 1
}

# ========== Main Script ==========

choice=$(show_main_menu)

case "$choice" in
  "Set status of a Project(s) or Repo(s)")
    set_project_status
    ;;
  "Make a simple commit")
    make_simple_commit
    ;;
  "Quit")
    show_exit_message ""
    ;;
  *)
    show_error
    ;;
esac
