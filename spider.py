#coding=utf-8
import re
import urllib

def getHtml(url):
    page = urllib.urlopen(url)
    html = page.read()
    return html

def getImg(html):
    reg = u'https?://.+\.(jpg|gif|png)'
    imgre = re.compile(reg)
    imglist = re.findall(imgre,html)
    print imglist
    x = 0
    for imgurl in imglist:
        urllib.urlretrieve(imgurl, 'img/%s.jpg' % x)
        x+=1
   
html = getHtml("https://www.douyu.com/directory/rank_list/yz")
print getImg(html)