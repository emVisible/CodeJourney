from flask import Flask, render_template, request, redirect, url_for, session, flash, current_app
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = 'preview'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.permanent_session_lifetime = timedelta(minutes=5)

db = SQLAlchemy(app)

'''
  创建user ORM
'''


class users(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, name, email):
        self.name = name
        self.email = email


@app.route('/')
def home():
    return render_template('home.html')


'''
  每次登录通过session存储数据
'''


@app.route('/login', methods=['POST', 'GET'])
def login():
    # 登录后存储数据
    if request.method == 'POST':
        session.permanent = True
        user = request.form['nm']
        session['user'] = user
        if found_user := users.query.filter_by(name=user).first():
            session['email'] = found_user.email
        else:
            usr = users(name=user, email="")
            db.session.add(usr)
            db.session.commit()

        flash('Login successful')
        return redirect(url_for('user'))
    # 返回已有数据
    else:
        if 'user' in session:
            flash('Already logged in')
            return redirect(url_for('user'))
        return render_template('login.html')


'''
  存储
    处理session存在情况
    处理session不存在情况

  请求
    处理post
    处理get
'''


@app.route('/user', methods=['POST', 'GET'])
def user():
    email = None
    # 已登录
    if 'user' in session:
        user = session['user']

        # 处理post请求 处理发送来的数据
        if request.method == 'POST':
            email = request.form['email']
            session['email'] = email

            found_user = users.query.filter_by(name=user).first()
            found_user.email = email
            db.session.commit()
            flash("Email was saved")

        # 处理get请求 返回已有数据
        else:
            if 'email' in session:
                email = session['email']

        return render_template('user.html', user=user, email=email)
    # 没哟session说明没有登录 提示未登录 + redirect
    else:
        flash('You are not logged in')
        return redirect(url_for('login'))


@app.route('/view')
def view():
    return render_template('view.html', values=users.query.all())


'''
  清除session临时数据
'''


@app.route('/logout')
def logout():
    flash(f'You have been logout', 'info')
    session.pop('user', None)
    session.pop('email', None)
    return redirect(url_for('login'))


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=8000, debug=True)
