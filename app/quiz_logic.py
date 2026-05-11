import random
from .morse_data import MORSE


def generate_quiz_set(count=10):
    """クイズの問題セットを生成する関数
    Args:
        count (int, optional): 生成する問題の数. Defaults to 10.
    Returns:
        list: クイズの問題セット
    """
    questions = []

    letters = list(MORSE.keys())

    for _ in range(count):
        letter = random.choice(letters)
        questions.append({"question": MORSE[letter], "answer": letter})
    return questions
