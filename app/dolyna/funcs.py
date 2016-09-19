from dolyna import *
import random


# return: Api Version
def get_api_ver():
    return dsettings('ApiVersion')


# return: Api Key
def get_api_key():
    return dsettings('ApiKey')


def get_key(key):
    if key != get_api_key():
        return False

    return True


def upload_random_content():
    content = Content(
        article_category=random.randint(0, 3),
        article_title=random.randint(1312, 123412),
        article_text=random.randint(1231232, 32141242144),
        article_date=random.randint(231,12312),
        article_date_end=random.randint(231, 12312)
    )
    db.session.add(content)
    db.session.commit()
    return True


# For testing:
def dsettings(setting_name):
    return Test_Settings.get(setting_name)
