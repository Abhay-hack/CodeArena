def run_python():
    import subprocess
    with open("test_cases/problem_1/input.txt") as f:
        input_data = f.read()

    with open("submission.py", "w") as code_file:
        code_file.write("print(sum(map(int, input().split())))")  # Dummy code

    result = subprocess.run(
        ["python3", "submission.py"],
        input=input_data,
        text=True,
        capture_output=True
    )

    with open("test_cases/problem_1/output.txt") as f:
        expected = f.read().strip()

    print("Your Output:", result.stdout.strip())
    print("Expected:", expected)

    if result.stdout.strip() == expected:
        print("✅ Accepted")
    else:
        print("❌ Wrong Answer")
