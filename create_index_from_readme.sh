#!/bin/bash

# Ton message personnalisé en haut de chaque index.md
HEADER="---
layout: default
---"

# Cherche tous les README.md sauf dans node_modules
find . -type f -name "README.md" ! -path "*/node_modules/*" | while read -r readme; do
    dir=$(dirname "$readme")
    mkdir -p docs
    index="$dir/docs/index.md"

    # Crée un nouveau index.md en ajoutant le header + contenu du README
    {
        echo -e "$HEADER"
        cat "$readme"
    } > "$index"

    echo "✔️ Created $index"
done
