for dir in "$@"; do
   if [ ! -d "$dir" ]; then
      mkdir "ex$dir"
   fi
done
