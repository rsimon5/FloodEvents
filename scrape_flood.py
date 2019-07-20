from splinter import Browser
from bs4 import BeautifulSoup
import time
import pandas as pd

def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

flood_info={}
def scrape_image():
    try:
        browser=init_browser()
        image_url="https://www.ssec.wisc.edu/data/us_comp/"

        browser.visit(image_url)
        time.sleep(1)

        html_image=browser.html
        soup=BeautifulSoup(html_image, 'html.parser')

        partial_url=soup.find('a', href='us_comp.html').find('img')['src']
        satellite_image=image_url+partial_url

        image_info=soup.find('h2').text
        flood_info["satellite_image"]=satellite_image
        flood_info["image_info"]=image_info

        return flood_info
    finally:
        browser.quit()