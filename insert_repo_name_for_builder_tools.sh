if [ -z "$1" ]; then
    echo "Any directorie name (Repo) was given. Please give one"
    exit 1
fi

rootName="$1"

find . -type f -name "webpack.config.js" ! -path "*/node_modules/*" | while read -r config; do
    echo "🔍 Processing: $config"

    projectPath=$(dirname "$config")
    cleanProjectPath="${projectPath#./}"
    githubPath="/$rootName/$cleanProjectPath/dist/"

    echo "📦 Replacing publicPath with: $githubPath"$'\n'

    sed -i "s|publicPath:.*|publicPath: '$githubPath',|" "$config"

done

find . -type f -name "vite.config.ts" ! -path "*/node_modules/*" | while read -r config; do
    echo "🔍 Processing: $config"

    projectPath=$(dirname "$config")
    cleanProjectPath="${projectPath#./}"
    githubPath="/$rootName/$cleanProjectPath/dist/"

    echo "📦 Replacing base with: $githubPath"$'\n'

    sed -i "s|base:.*|base: '$githubPath',|" "$config"

done