#!/bin/bash

HEADER="---
layout: default
---"

find . -type f -name "README.md" ! -path "*/node_modules/*" | while read -r readme; do
    dir=$(dirname "$readme")
    mkdir -p "$dir/docs"
    index="$dir/docs/index.md"


    {
        echo -e "$HEADER"
        cat "$readme"
    } > "$index"

    echo "✔️ Created $index"

    toExcludeFile="$dir/.toExclude"

    if [ ! -f "$toExcludeFile" ]; then
        echo "docs"$'\n' > "$toExcludeFile"
        echo "🆕 Created .toExclude with 'docs'"
    else

        if ! grep -Fxq "docs" "$toExcludeFile"; then
            echo $'\n'"docs" >> "$toExcludeFile"
            echo "➕ Added 'docs' to existing .toExclude"
        else
            echo "✔️ 'docs' already in .toExclude"
        fi
    fi

done
