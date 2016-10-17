import urllib2
from bs4 import BeautifulSoup

quote_page = 'https://www.nhl.com/scores' 

page = urllib2.urlopen(quote_page)

soup = BeautifulSoup(page, 'html.parser')

labels = soup.select('h1 > .nhl-scores__list-date-label-item')
if labels is not None:
    labels_text = labels[0].text.strip()
# price_box = soup.find('div', attrs={'class':'price'})

# name = name_box.text.strip()
# price = price_box.text

print labels
print labels_text
