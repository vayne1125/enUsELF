from calendar import c
from urllib import request
import requests
import os
import sys
from bs4 import BeautifulSoup
import json
sys.stdout = open('output.txt', 'w', encoding='UTF-8')
json_path = 'D:\\react\\enUsELF\\first\\app\\theme\\Food.json'
json_path1 = 'D:\\react\\enUsELF\\first\\app\\theme\\Food_.json'
img_path = 'D:\\react\\enUsELF\\first\\assets\\foodImage\\'


def get_json_data(json_path):
    img_links = {}
    with open(json_path1, 'rb') as f:
        res = json.load(f)
    f.close()
    url = "https://www.funtime.com.tw/blog/funtime/western-taichung-food"
    response = requests.get(url)
    response.encoding = 'UTF-8'
    soup = BeautifulSoup(response.text, "html.parser")
    infos = soup.find_all("p",class_="t5")
    id = 0
    cnt = 0
    res2 = []
    pro = []
    address = []
    time = []
    ck = 0
    for info in infos:
        if(cnt<=36 or cnt>=56):
            if(cnt%2==0):
                cnt+=1
                continue
        else:
            if(cnt%2==1):
                cnt+=1
                continue
        if(cnt==15):
            cnt+=1
            continue
        img_links[res[id]["name"]]=info.find('img').attrs['data-lazy-src']
        id+=1
        cnt+=1
    print(img_links)

    # for info in res:
    #     res[cnt]["id"]=id
    #     id+=1
    #     cnt+=1
    # print(res)

    # with open(json_path,'rb')as file:
    #     res=json.load(file)
    # file.close()
    # print(res)
    # print("----------------------------")
    # with open(json_path1,'rb') as f:
    #     items=json.load(f)
    #     id=19
    #     for item in items:
    #         tp={}
    #         tp["id"]=id
    #         id=id+1
    #         tp["name"]=item["TR_CNAME"]
    #         tp["address"]=item["TR_POSITION"]
    #         tp["city"]=item["TR_POSITION"][0:3]
    #         tp["region"]=item["TR_POSITION"][3:]
    #         tp["star"]=0
    #         tp["info"]=item["GUIDE_CONTENT"]
    #         tp["time"]="無"
    #         url=item["URL"]
    #         response = requests.get(url)
    #         soup = BeautifulSoup(response.text, "html.parser")
    #         div=soup.find("div",class_="img_block")
    #         img=div.find("img").attrs['src']
    #         img_links[item["TR_CNAME"]]="https://recreation.forest.gov.tw/"+img
    #         img_links[item["TR_CNAME"]]=item["IMG_URL"]
    #         item["IMG_URL"]="https://recreation.forest.gov.tw/"+img
    #         item["IMG"]=item["TR_CNAME"]+".jpg"
    #         address=item["ADMIN_Name"]
    #         item["city"]=address[0:3]
    #         item["region"]=address[3:]
    #         res.append(tp)
    # f.close()
    # download picture
    # for name in img_links:
    #     print(name)
    #     img_content=requests.get(img_links[name])
    #     with open(img_path+name+".jpg","wb") as file:
    #         file.write(img_content.content)
    #     file.close()
    return res


def add_json_data(data):
    with open(json_path1, 'w', encoding="utf8") as r:
        json.dump(data, r, ensure_ascii=False)
    r.close()


def transform():
    with open(json_path, 'rb') as f2:
        items = json.load(f2)
        cnt = 1
        for item in items:
            print(
                "exports."+item["name"] + "= require('../../assets/foodImage/"+item["name"]+".jpg');")
    f2.close()


#ori = get_json_data(json_path)
#add_json_data(ori)
transform()
