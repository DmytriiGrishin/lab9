all:
	ember build; git add dist; git commit -m "bug fix"; git push -u origin master
