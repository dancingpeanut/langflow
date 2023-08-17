import requests
from langchain.llms.openai import OpenAI
from langflow.settings import settings


LOCAL_AI_BASE = settings.LLMS["LocalAI"]["url"]


class LocalAI(OpenAI):
    openai_api_key = "no key"
    openai_api_base = LOCAL_AI_BASE

    __doc__ = "海致大模型"

    @staticmethod
    def get_models():
        res = requests.get(LOCAL_AI_BASE + '/models').json()
        return [r['id'] for r in res['data']]


CUSTOM_LLMS = {
    "LocalAI": LocalAI,
}
