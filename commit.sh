read -rp "Enter your commit message: " commit_message

if [[ -z "$commit_message" ]]; then
  echo "Error: Please enter a commit message."
  exit 1
fi

git add .
git commit --no-verify -m "$commit_message"
echo "Commit created successfully!"
git push