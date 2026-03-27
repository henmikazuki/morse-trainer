import random
from morse_data import MORSE


def generate_quiz_set(count=10):
    questions = []

    letters = list(MORSE.keys())

    for _ in range(count):
        letter = random.choice(letters)
        questions.append({"question": MORSE[letter], "answer": letter})
    return questions
