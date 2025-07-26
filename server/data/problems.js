// backend/data/problems.js

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Find two numbers such that they add up to a specific target.',
    sampleInput: "2 3",
    sampleOutput: "5",
    templates: {
      cpp: 'https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/problem-1/cpp.cpp',
      python: 'https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/problem-1/python.py',
    }
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    difficulty: 'Medium',
    description: 'Reverse a singly linked list.',
    templates: {
      cpp: 'https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/problem-2/cpp.cpp',
      python: 'https://raw.githubusercontent.com/Abhay-hack/codearena-code-templates/main/problem-2/python.py',
    }
  }
];

module.exports = problems;
