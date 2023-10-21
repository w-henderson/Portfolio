import os
import json
from datetime import datetime

PROJECT_DIR = os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir, os.pardir, os.pardir))
METADATA_PATH = os.path.join(PROJECT_DIR, "metadata.json")
RSS_PATH = os.path.join(PROJECT_DIR, "dist", "feed.xml")

with open(METADATA_PATH) as f:
    metadata = json.load(f)

posts_dir = next(filter(lambda x: x["type"] == "directory" and x["name"] == "blog", metadata["data"]))
posts = map(lambda x: x["value"], filter(lambda y: y["type"] == "markdown", posts_dir["children"]))

def date(d):
    return datetime.strptime(d, "%Y-%m-%d").strftime("%a, %d %b %Y 00:00:00 +0000")

items = "".join(map(lambda x: f"""
  <item>
    <title><![CDATA[{x["title"]}]]></title>
    <link>https://whenderson.dev{x["slug"]}</link>
    <guid isPermaLink="false">https://whenderson.dev{x["slug"]}</guid>
    <pubDate>{date(x["date"])}</pubDate>
    <description><![CDATA[{x["description"]}]]></description>
    <media:content url="https://whenderson.dev/images{x["slug"]}.png" medium="image" />
  </item>""", sorted(posts, key=lambda x: x["date"], reverse=True)))

now = datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")

rss = f"""<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">

<channel>
  <title>William Henderson</title>
  <link>https://whenderson.dev/blog</link>
  <atom:link href="https://whenderson.dev/feed.xml" rel="self" type="application/rss+xml" />
  <description>William Henderson's blog.</description>
  <language>en-gb</language>
  <lastBuildDate>{now}</lastBuildDate>
  <image>
    <url>https://whenderson.dev/images/icon.png</url>
    <title>William Henderson</title>
    <link>https://whenderson.dev/blog</link>
  </image>
{items}
</channel>

</rss>"""

with open(RSS_PATH, "w") as f:
    f.write(rss)