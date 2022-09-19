from fastapi import FastAPI
import requests
import sys
import uvicorn
from bs4 import BeautifulSoup
import json

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World~~"}

@app.get("/weather")
def weather_data(City: str, Region: str):
    Citys = {
        "宜蘭縣": "F-D0047-003",
        "桃園市": "F-D0047-007",
        "新竹縣": "F-D0047-011",
        "苗栗縣": "F-D0047-015",
        "彰化縣": "F-D0047-019",
        "南投縣": "F-D0047-023",
        "雲林縣": "F-D0047-027",
        "嘉義縣": "F-D0047-031",
        "屏東縣": "F-D0047-035",
        "臺東縣": "F-D0047-039",
        "台東縣": "F-D0047-039",
        "花蓮縣": "F-D0047-043",
        "澎湖縣": "F-D0047-047",
        "基隆市": "F-D0047-051",
        "新竹市": "F-D0047-055",
        "嘉義市": "F-D0047-059",
        "臺北市": "F-D0047-063",
        "台北市": "F-D0047-063",
        "高雄市": "F-D0047-067",
        "新北市": "F-D0047-071",
        "臺中市": "F-D0047-075",
        "台中市": "F-D0047-075",
        "臺南市": "F-D0047-079",
        "台南市": "F-D0047-079",
        "連江縣": "F-D0047-083",
        "金門縣": "F-D0047-087",
        }

    dataid = Citys[City]
    apikey = "CWB-45F00FC1-0F58-4755-BABD-B161D9F90D5C"
    format = "JSON"
    url = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/" + \
        dataid+"?Authorization="+apikey+"&format="+format
    response = requests.get(url)

    if response.status_code == 200:
        data = json.loads(response.text)
        items = data["records"]["locations"][0]["location"]
        for item in items:
            if(item["locationName"] == Region):
                obj = item
        elements = obj["weatherElement"]
        # Wx 天氣現象
        # MinT 最低溫度
        # MaxT 最高溫度
        # startTime 開始時間
        res={"icon_num":[],"max_tem":[],"min_tem":[],"time":[]}
        for element in elements:
            if(element["elementName"] == "Wx"):
                for i in range(1, 14, 2):
                    res["icon_num"].append(
                        #"require('../../assets/weatherIcon/"+
                        element["time"][i]["elementValue"][1]["value"]
                        #+".png')"
                        )
                    res["time"].append(
                        element["time"][i]["startTime"])
            elif(element["elementName"] == "MaxT"):
                for i in range(1, 14, 2):
                    res["max_tem"].append(
                        element["time"][i]["elementValue"][0]["value"])
            elif(element["elementName"] == "MinT"):
                for i in range(1, 14, 2):
                    res["min_tem"].append(
                        element["time"][i]["elementValue"][0]["value"])
        return(res)
    else:
        print("Can't get data!")
  
<<<<<<< HEAD
print('d')
=======
if __name__ == '__main__':
    print('gogo')
    uvicorn.run(app='main:app',host='127.0.0.1',port=8000,reload=True,debug = True)
>>>>>>> cd894a781f66a455030c5cdfabd788233f40e962
