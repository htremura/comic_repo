echo "Welcome to the auto-tweezer!"
echo "Please enter the starting passage (Default: Start): "
read prompt

if [[ -v prompt ]]
then
	tweego -t -s "$prompt" -o "test.html" Inputs
else
	tweego -t -s "Start" -o "test.html" Inputs
fi

