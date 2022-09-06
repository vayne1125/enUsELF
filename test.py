from calendar import c
from urllib import request
import requests
import os
import sys
from bs4 import BeautifulSoup
import urllib
import json
import parsel
from urllib.parse import quote
import string
import googlemaps
sys.stdout = open('output.txt', 'w', encoding='UTF-8')
json_path = 'D:\\react\\enUsELF\\first\\app\\theme\\Monuments.json'
json_path1 = 'D:\\react\\enUsELF\\first\\app\\theme\\Monuments_.json'
json_path2 = 'D:\\react\\enUsELF\\first\\app\\theme\\tp.json'
img_path = 'D:\\react\\enUsELF\\first\\assets\\KOLImage\\'


def get_json_data(json_path):
    img_links = {}
    with open(json_path1, 'rb') as f:
        res = json.load(f)
    f.close()
    # url = "https://www.welcometw.com/台中住宿/"
    # response = requests.get(url)
    # response.encoding = 'UTF-8'
    # soup = BeautifulSoup(response.text, "html.parser")
    # infos = soup.find_all("pre")

    headers = {
        # 'cookie': 'TADCID=w9vVt2L4b-8tpPAPABQCFdpBzzOuRA-9xvCxaMyI12-Pv2FD2kQ6MpDVdQGQxbVy2SOJUSLYzz8QFg7w-ve4K_fBRTsFY_kacdY; TAUnique=%1%enc%3AHARC1EMLan58P07MI4ZMcqI%2BzHGWuLGBt6TE6zQDNwk%3D; TASSK=enc%3AAL%2Bm9xwFy7%2BjYONIRS%2F2kEbA%2FtOrlDbcW%2FwCSHs44XP9R3ddE%2BKJxi3FiDuozLe0Ov2ujtnFah8i0sN%2FRdUxZGis0TClwsaz7%2B7Uv8dh%2BvHM%2FfH9C%2FcEYLBYBtn1yLmBNg%3D%3D; ServerPool=A; PMC=V2*MS.2*MD.20220311*LD.20220311; TART=%1%enc%3AfD9OzCOGTHLKxR1qLNfmGZurd9xliidHT5bmQw2z505WnDQeBJdPDWc64WFlxikpNox8JbUSTxk%3D; TATravelInfo=V2*A.2*MG.-1*HP.2*FL.3*RS.1; TASID=9CCF4EA45B4141A8B5E4F03D36821474; ak_bmsc=31083286436C157F558D959D23D94849~000000000000000000000000000000~YAAQqF1kX6lPsVF/AQAAhTyqdw8F4+OoWZwjJCqsKUS/ykkFQHkXml5We7WY4q6KDUeIkm36a0Fs41jt7Jx6MFwnzloND2Iry1Iuwnj5I7oPxsI1RTjfGXSr408rscnzKPJHpRIXwuuiL+SNZxp233DOhrqrbTQ2cDTiGPk8qAYcLYq1OHpyOjLpc6L2zPbiSdvfDAuz2ujLUbWZV33YVrUd1UcmBMKJOSS/C12JeFdLCcjOihJvc4Zlu5HMYQUBdjTaV4zll3YO9YWxdm5pUT57vjI3WjxNhLwOXS93F3ogo/VOzmvk2n4rptCDH1vffz7Dpmp4yRn0dnX8RtiKiolFV00rBs0yC9Nxa67F0qPkJMMS6t6pNo+08PIre7VIiAIxQoWUNNiBiNDXeQ==; PAC=AHc5Ocqizh5jbN81AnjCtcF7k5P54vojrezhxeu8s4DdhkIZSMBuxXUioaVGVVo99Ysr_IbYXqNKjsddfzI8psluCp1NwuwQiBOvmdhP_r8ntVPeHXBc5u782Y8i4KrpV0a29aTnmykzihOxeEfilEfHZOGZxkWN8GRLwHay1MUpBazo7e4Pdtl3tndoYnNIDWcRtHzZJIDE9odWhqOzUE0%3D; TAReturnTo=%1%%2FRestaurants-g188590-Amsterdam_North_Holland_Province.html; roybatty=TNI1625!AJyUZ5ejQVombB9Jv3PVhqqhyMhwsanzT2C6omYz8l6mQNt%2FP5v6CLnnlymNXfhMwolnHznm%2BAmT81YSeygcVxnWHERn16eR747rX9fmWmeCMoris6ffxKTbJ6%2BjObZ6rmffv7I5wEGZ009WzKMlVA%2BXJAheGoIKHOD3gUDLVYlY%2C1; TATrkConsent=eyJvdXQiOiIiLCJpbiI6IkFMTCJ9; TASession=V2ID.9CCF4EA45B4141A8B5E4F03D36821474*SQ.9*LS.PageMoniker*GR.82*TCPAR.12*TBR.1*EXEX.98*ABTR.74*PHTB.27*FS.67*CPU.8*HS.recommended*ES.popularity*DS.5*SAS.popularity*FPS.oldFirst*LF.en*FA.1*DF.0*TRA.false*LD.188590*EAU._; TAUD=LA-1646980142821-1*RDD-1-2022_03_11*LG-863371-2.1.F.*LD-863372-.....; _pbjs_userid_consent_data=3524755945110770; _li_dcdm_c=.tripadvisor.com; _lc2_fpi=b140173de591--01fxvvhm5q52dte42gshbn1234; __gads=ID=887c76ae8964a5bc:T=1646981079:S=ALNI_MYwTZNsJPdidCGF3BTM3pOV79wAUg; _lr_sampling_rate=100; _lr_retry_request=true; _lr_env_src_ats=false; __li_idex_cache=%7B%7D; pbjs_li_nonid=%7B%7D; __vt=bI5Nl4_3wIiyQqd-ABQCIf6-ytF7QiW7ovfhqc-AvRvwyUuxl21BvNUgBcewLtYtxhD9pK8plYHHUPpFuGJQzlL9HjsNiQXGwLu0f-XidRXohA9m08ary-La12XkjuKCU2QeR3ijnhWjQ8bnjvOcAaUKoA; bm_sv=867C80B13B2E8AE707E1A411B950E849~HDnKV8jbSFu9eHNiLb/p3fK3KqcxdMjPpLXFMD9YvvwLoQEuDGPgZZwEDhQeezJZJhdrUxX02mvzmDqkV7615Fm508wASvLcLsXmW/6+1K9pDp2UuCDIYbuZgv/2m76YS7Og/SBcU6xkIVnHhMVqpxWfro/1T3kO1LdXuFuprhA=; OptanonConsent=isGpcEnabled=0&datestamp=Fri+Mar+11+2022+14%3A53%3A51+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=6.30.0&isIABGlobal=false&hosts=&consentId=cc7e2f72-5007-428f-a72e-392f9741b69d&interactionCount=1&landingPath=https%3A%2F%2Fwww.tripadvisor.com%2FRestaurants-g188590-Amsterdam_North_Holland_Province.html&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
    }
    url = 'https://www.tripadvisor.com.tw/Attractions-g293910-Activities-c47-t17-oa60-Taiwan.html'
    response = requests.get(url, headers=headers)
    html_data = response.text
    selector = parsel.Selector(html_data)
    soup = BeautifulSoup(response.text, "html.parser")
    # 提取标签的属性内容 ::attr(href) 链接
    link_list = soup.find_all("div", class_="alPVI eNNhq PgLKC tnGGX")
    id = 61
    res2 = []
    for link in link_list:
        link = 'https://www.tripadvisor.com.tw/' + link.find("a").attrs["href"]
        detail_html = requests.get(link, headers=headers)
        soup2 = BeautifulSoup(detail_html.text, "html.parser")
        address = soup2.find("div", class_="Kxegy _R w _Z GA")
        print(address)
        if(id-61+1 == 28):
            id += 1
            continue
        img_links[res[id-61]["name"]] = address.attrs["style"][21:-1]
        id += 1
        # print(soup2.find("button",class_="UikNM _G B- _S _T c G_ P0 bYExr wnNQG raEkE"))
        # res2.append(tp)

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


def add_json_data(data, path):
    with open(path, 'w', encoding="utf8") as r:
        json.dump(data, r, ensure_ascii=False)
    r.close()


def transform():
    with open(json_path, 'rb') as f2:
        items = json.load(f2)
        cnt = 1
        for item in items:
            print(
                "exports."+item["name"] + "= require('../../assets/monumentsImage/"+item["name"]+".jpg');")
    f2.close()


gmaps = googlemaps.Client(key='AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY')


def google_api_url(myname):
    baseURL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'
    name = 'input='+myname
    # 輸入的關鍵字
    inputtype = '&inputtype=textquery'  # input類型
    api = '&language=zh-TW&key=AIzaSyDHq53RuJ511QN4rLqFmwLWiXA1_-nR7vY'
    # 語言，api金鑰
    # req = '&fields=name,formatted_address,opening_hours,rating,place_id,geometry'
    req = '&fields=business_status,formatted_address,geometry,name,opening_hours,place_id,rating'
    # 需要的資料
    return baseURL+name+inputtype+req+api


def google_api():
    with open(json_path1, 'rb') as f:
        res = json.load(f)
    f.close()
    ck = 0
    id = 40
    result = {}
    for i in range(75, 90):
        url = google_api_url(res[i]["name"])
        url = quote(url, safe=string.printable)
        jsonurl = urllib.request.urlopen(url)
        result = json.loads(jsonurl.read())
        print(i+1)
        print(res[i]["name"])
        print(result["candidates"][0]["name"])
        res[i]["place_id"] = result["candidates"][0]["place_id"]
        ans = gmaps.place(result["candidates"][0]
                          ["place_id"], language='zh-TW')
        res[i]["lat"] = ans["result"]["geometry"]["location"]["lat"]
        res[i]["lng"] = ans["result"]["geometry"]["location"]["lng"]
        #print(ans["result"]["formatted_address"])
        res[i]["address"]=ans["result"]["formatted_address"]
        res[i]["city"]=ans["result"]["address_components"][-3]["long_name"]
        res[i]["region"]=ans["result"]["address_components"][-4]["long_name"]

        try:
            # if(res[i]["time"] == "無"):
            #     if(type(ans["result"]["opening_hours"]["weekday_text"]) == list):
            #         s = ""
            #         for day in ans["result"]["opening_hours"]["weekday_text"]:
            #             s += day+"\n"
            #         s = s[:-1]
            #         res[i]["time"] = s
            #     else:
            #         res[i]["time"] = ans["result"]["opening_hours"]["weekday_text"]

            if(type(ans["result"]["opening_hours"]["weekday_text"]) == list):
                s = ""
                for day in ans["result"]["opening_hours"]["weekday_text"]:
                    s += day+"\n"
                s = s[:-1]
                res[i]["time"] = s
            else:
                res[i]["time"] = ans["result"]["opening_hours"]["weekday_text"]
        except KeyError:
            # if(res[i]["time"] =="無"):
            #     res[i]["time"] = "無"
            #     print(i+1, "time")

            res[i]["time"] = "無"
            print(i+1, "time")
        try:
            res[i]["star"] = ans["result"]["rating"]
        except KeyError:
            #res[i]["star"] = 0
            print(i+1, "star")

    # url=google_api_url("哈瑪星鐵道文化園區")
    # url = quote(url, safe=string.printable)
    # jsonurl = urllib.request.urlopen(url)
    # result = json.loads(jsonurl.read())
    # print(res[id]["name"])
    # print(result)
    # res[id]["place_id"]=result["candidates"][0]["place_id"]
    # ans=gmaps.place(result["candidates"][0]["place_id"],language='zh-TW')
    # res[id]["lat"]=ans["result"]["geometry"]["location"]["lat"]
    # res[id]["lng"]=ans["result"]["geometry"]["location"]["lng"]
    # res[id]["address"]=ans["result"]["formatted_address"]
    # #res[id]["city"]=ans["result"]["address_components"][-3]["long_name"]
    # #res[id]["region"]=ans["result"]["address_components"][-4]["long_name"]
    # try:
    #     # if(res[id]["time"]=="無"):
    #     #     if(type(ans["result"]["opening_hours"]["weekday_text"])==list):
    #     #         s=""
    #     #         for day in ans["result"]["opening_hours"]["weekday_text"]:
    #     #             s+=day+"\n"
    #     #         s=s[:-1]
    #     #         res[id]["time"]=s
    #     #     else:
    #     #         res[id]["time"]=ans["result"]["opening_hours"]["weekday_text"]

    #     if(type(ans["result"]["opening_hours"]["weekday_text"])==list):
    #         s=""
    #         for day in ans["result"]["opening_hours"]["weekday_text"]:
    #             s+=day+"\n"
    #         s=s[:-1]
    #         res[id]["time"]=s
    #     else:
    #         res[id]["time"]=ans["result"]["opening_hours"]["weekday_text"]
    # except KeyError:
    #     # if(res[id]["time"]=="無"):
    #     #     res[id]["time"]="無"
    #     #     print(id+1,"time")
        
    #     res[id]["time"]="無"
    #     print(id+1,"time")

    # try:
    #     # if(res[id]["star"]==0):
    #     #     res[id]["star"]=ans["result"]["rating"]

    #     res[id]["star"]=ans["result"]["rating"]
    # except KeyError:
    #     if(res[id]["star"]==0):
    #         res[id]["star"]=0
    #         print(id+1,"star")
    # add_json_data(ans,json_path2)

    return res


def modify():
    with open(json_path1, 'rb') as f:
        res = json.load(f)
    f.close()
    id = 1
    for tp in res:
        res[id-1]["id"] = id
        res[id-1]["star"]=float(res[id-1]["star"])
        id += 1
    return res
# ori = get_json_data(json_path)
# add_json_data(ori,json_path1)
# transform()
after=modify()
#after = google_api()
add_json_data(after, json_path1)
