import sys
import subprocess

language = sys.argv[1]
filename = sys.argv[2]

if language == "python":
    subprocess.run(["python3", filename])
elif language == "cpp":
    subprocess.run(["g++", filename, "-o", "a.out"])
    subprocess.run(["./a.out"])
elif language == "java":
    subprocess.run(["javac", filename])
    subprocess.run(["java", filename.split(".")[0]])
