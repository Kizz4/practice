#!/bin/bash

HEADER="---
layout: default
---"

find . -type f -name "README.md" ! -path "*/node_modules/*" | while read -r readme; do
    dir=$(dirname "$readme")
    index="$dir/index.md"


    {
        echo -e "$HEADER"
        cat "$readme"
    } > "$index"

    echo "✔️ Created $index"

    toExcludeFile="$dir/.toExclude"

    if [ ! -f "$toExcludeFile" ]; then
        echo "index.md"$'\n' > "$toExcludeFile"
        echo "🆕 Created .toExclude with 'docs'"
    else

        if ! grep -Fxq "index.md" "$toExcludeFile"; then
            echo $'\n'"index.md" >> "$toExcludeFile"
            echo "➕ Added 'index.md' to existing .toExclude"
        else
            echo "✔️ 'index.md' already in .toExclude"
        fi
    fi

done
