# Aircon_Controller
空調機制御<br>
-開発言語：JavaScript<br>
-表示言語：日本語・Japanese<br>
-開発環境：VSCode、XML（LANインタフェースとして）、Git(Sourcetree)、GitHub<br>
-注意点：現時点(2024/06/07)VSCodeで実行するとき、Live Serverをインストール必要がある。<br>
-開発目的：建物内、外の環境を設定する機器を一つに纏めて制御する。<br>
-主な機能：<br>
    ・XMLで設定したDataを呼び出し、画面を表示する。<br>
    ・機器のユニット（単一、複数）を選択し、設定を変更した後、OKボタンを押すと、変更した内容がXMLに反映される。<br>

-今後の計画：<br>
    ・初期バージョンはWEBで開発し、最終目的としてはアプリまで開発し、リリースすること。<br>
    ・serverはまだ未定（ApacheやAWS使用予定）<br>
    ・バック言語：Java(ログインやXMLデータをJDBCする。)<br>
    ・データベース未定<br>
