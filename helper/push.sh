d="v3.0" 
echo "$d"
git --no-pager diff
git add .
git commit -m "$d"
git push origin main
