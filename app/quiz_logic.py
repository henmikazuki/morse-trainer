import random
from .morse_data import MORSE_SINGLE, MORSE_WORD


def choice_quiz_set(mode):
    if mode == "single":
        return MORSE_SINGLE
    elif mode == "word":
        return MORSE_WORD


def generate_quiz_set(mode, count=10):
    """クイズの問題セットを生成する関数
    Args:
        mode (str): クイズのモード.
        count (int, optional): 生成する問題の数. Defaults to 10.
    Returns:
        list: クイズの問題セット
    """
    questions = []

    quiz_set = choice_quiz_set(mode)
    letters = list(quiz_set["question"].keys())

    for _ in range(count):
        letter = random.choice(letters)
        questions.append(
            {
                "mode": quiz_set["mode"],
                "question": quiz_set["question"][letter],
                "answer": letter,
            }
        )
    return questions
