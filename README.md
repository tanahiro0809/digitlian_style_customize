# でじたりあん運用  

## レイアウト基本ファイル構成  

~~~
.
├── README.md
├── dist
│   └── http
│       ├── css
│       │   ├── style.css
│       │   └── ts-fab.css
│       ├── entry.html
│       ├── images
│       │   ├── favicon.png
│       │   ├── hero_index_pc.jpg
│       │   ├── hero_index_sp.jpg
│       │   ├── icn_bread_home.png
│       │   ├── icn_hdg1.png
│       │   ├── icn_hdg2.png
│       │   ├── icn_hdg3.png
│       │   ├── icn_head_fb.png
│       │   ├── icn_head_search.png
│       │   ├── icn_head_tw.png
│       │   ├── logo_company.png
│       │   ├── logo_foot.png
│       │   └── logo_head.png
│       └── js
│           ├── common.js
│           ├── jquery-3.0.0.min.js
│           ├── jquery.matchHeight-min.js
│           ├── object-fit.min.js
│           └── slick
│               ├── ajax-loader.gif
│               ├── fonts
│               │   ├── slick.eot
│               │   ├── slick.svg
│               │   ├── slick.ttf
│               │   └── slick.woff
│               ├── slick-theme.css
│               ├── slick.css
│               ├── slick.min.js
│               └── slide_cnt.js
│
├── gulpfile.js
├── package.json
└── src
    └── http
        └── css
            ├── base
            │   ├── _setting.scss
            │   └── _universal.scss
            ├── function
            │   └── _z-index.scss
            ├── layout
            │   ├── _footer.scss
            │   ├── _header.scss
            │   └── _main.scss
            ├── mixin
            │   ├── _breakpoint.scss
            │   ├── _common.scss
            │   └── _font-line.scss
            ├── module
            │   ├── _area.scss
            │   ├── _article.scss
            │   ├── _figure.scss
            │   ├── _hdg.scss
            │   ├── _lst.scss
            │   ├── _mainvisual.scss
            │   ├── _slide.scss
            │   └── _txt.scss
            ├── style.scss
            └── variable
                └── _color.scss
~~~  

## CSS  
  
 cssの更新は基本的にsassでコンパイルしたcssを利用する。  
   
### sassのコンパイル  

#### gulpの利用   

1. npmインストール

    ```
    $ npm install
    ```

2. gulpのコマンドパスを自動で通す 

    ```
    $ npm link gulp
    ```  
    or  
    ```
    $ sudo npm link gulp
    ```

3. gulp起動

    * ローカル サーバ
    ```
    $ gulp
    ```
  
### sassファイルのディレクトリ   

gulp起動中に`/src/`配下にあるファイルの編集を行うと自動で`dist`配下にあるcssファイルが更新される。  

#### sassファイルの各モジュールについて  

 - base  
   リセットcss・ヘルパーscssを保管
 - function  
   sassの関数を保管
 - layout  
   header・main・fotterのスタイルを保管
 - mixin  
   sassのmixinを保管
 - module  
   各モジュール保管
 - variable  
   sassの変数を保管
 - style.css  
   各sassディレクトリを集約  

### sassの注意点   
`dist`配下のcssを直接修正すると`src`配下のファイルと同期が取れなくなるため、`dist`配下のcssを直接修正する場合は、差分比較するか、sassの運用を中止する。  

## 各ファイルとwordpress管理画面の更新方法  

### css  
以下の手順でwordpressのテーマ編集にコピペする。  
  
 1. ローカル内でcssの修正  
 2. 以下の文字置換を行う  
  `url(/images/`  
  ↓  
  `url(images/`  
3. ソースを全コピー
4. wordpressのテーマ編集のcssにペースト  

### javascript  
 1. ローカル内で更新
 2. ソースを全コピー
 3. wordpressのテーマ編集のjavascriptにペースト

## 静的htmlについて
以下のファイルはローカルにてスタイルを確認するためのファイル  

 - index.html
   トップページ
 - entry.html
   記事
 - list.html
   一覧

## git
基本的に運用してちょ
