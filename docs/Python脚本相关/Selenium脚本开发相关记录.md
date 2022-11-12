# 二. 开发selenium项目时的一些记录

::: tip Document description
最近在开发selenium项目，以下是一些开发过程中会用到的一些代码块
:::

## 1. json配置文件解析

::: tip 参数说明
| 参数 | 类型 |说明 |
|-----|-----|-----|
|  **.\\\config.json**  | **str** | 你的json文件路径 |
|   **imgfilePath**  | **str** | 你的json字段 |

:::

```json
{
   "imgfilePath": "D:\\ERK\\fb"
}
```

```py
import json

 with open('.\\config.json', encoding='utf-8') as a:
        json_dict = json.load(a)
        yourfileDir = json_dict['imgfilePath']  # 得到文件路径
        print(yourfileDir)
```

## 2. 文件内容的读取（随机读取）

::: tip 参数说明
| 参数 |类型 | 说明 |
|-----|-----|-----|
|  **txtfileName**   | **str** | 你的文件路径 |

2. 表情符号不支持 **selenium** 的 **send_keys（）** 方法
   :::

```py
txtfileName = “.\\test.txt”

file = open(txtfileName, 'rb')
    data = file.read().decode('utf-8')
    file.close()

    n = data.count('\n')
    i = random.randint(1, (n + 1))

    random_line = linecache.getline(txtfileName, i)
    random_line_br = random_line.replace("|", "\n")  # 文件内容替换，将带 | 标识的内容替换成一行一句
    print(type(random_line_br))
    print(random_line_br)
    time.sleep(3)
```

## 3. 文件夹内容的读取（随机读取）

::: tip 参数说明
| 参数 | 类型 | 说明 |
|-----|-----|-----|
|  **readFileNumbers** | **int** | 需要随机的文件数量 |
|   **sourceDirs**  | **str**| 你的文件夹路径 |
:::

```py
sourceDirs = “.\\source”
readFileNumbers = 3

pathDir = os.listdir(sourceDirs)
    readFiles = random.sample(pathDir, readFileNumbers)
    for name in readFiles:
        path = sourceDirs + "\\" + name
        print(path)
```

