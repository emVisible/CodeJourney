package com.example.prac15;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Locale;
import java.util.Timer;
import java.util.TimerTask;

public class Login extends BaseActivity {
    EditText accountComponent;
    EditText passwordComponent;
   Button submitComponent;
    CheckBox checkBoxComponent;
    Database instance;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        init();
        // 可以选择帐号的数据源来自是在本地raw文件中还是在本地数据库中
        bindSubmitToDatabase();
        // bindSubmitToPreferences();
        bindToRegistry();
        isCheckedRememberPassword();
        initLanguage();
    }

    private void initLanguage() {

        Button switchToEnglishButton = findViewById(R.id.switch_language_to_english);
        Button switchToChineseButton = findViewById(R.id.switch_language_to_chinese);

        switchToEnglishButton.setOnClickListener(v -> switchLanguage("en"));
        switchToChineseButton.setOnClickListener(v -> switchLanguage("zh"));
    }

    private void switchLanguage(String languageCode) {
        Locale locale = new Locale(languageCode);
        Locale.setDefault(locale);
        Resources resources = getResources();
        Configuration config = new Configuration(resources.getConfiguration());
        config.setLocale(locale);
        resources.updateConfiguration(config, resources.getDisplayMetrics());
        recreate();
    }

    private void init() {
        EditText account = findViewById(R.id.main_account);
        EditText password = findViewById(R.id.main_password);
        Button submit = findViewById(R.id.main_submit);
        CheckBox checkBox = findViewById(R.id.main_checkbox);
        this.accountComponent = account;
        this.passwordComponent = password;
        this.submitComponent = submit;
        this.checkBoxComponent = checkBox;
        this.instance = Database.getInstance(this, "user.dp", null, 2);
    }

    private void bindToRegistry() {
        TextView textView = findViewById(R.id.to_registry);
        textView.setOnClickListener(v -> {
            Intent intent = new Intent(Login.this, Registry.class);
            startActivity(intent);
            finish();
        });
    }

    // 通过本地存储raw数据
    private void bindSubmitToPreferences() {
        this.submitComponent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String account = accountComponent.getText().toString();
                String password = passwordComponent.getText().toString();
                SharedPreferences.Editor editor = getSharedPreferences("data", MODE_PRIVATE).edit();
                if (account.equals("admin") && password.equals("12345")) {
                    if (checkBoxComponent.isChecked()) {
                        editor.putString("account", account);
                        editor.putString("password", password);
                        editor.apply();
                    } else {
                        editor.clear();
                        editor.apply();
                    }
                    route();
                }
            }
        });
    }

    private void bindSubmitToDatabase() {
        this.submitComponent.setOnClickListener(v -> {
            String account = accountComponent.getText().toString();
            String password = passwordComponent.getText().toString();
            SQLiteDatabase db = this.instance.getReadableDatabase();
            String selection = "account = ? AND password = ?";
            String[] selectionArgs = {account, password};
            @SuppressLint("Recycle") Cursor cursor = db.query("user", null, selection, selectionArgs, null, null, null);
            if (cursor != null && cursor.moveToFirst()) {
                SharedPreferences.Editor editor = getSharedPreferences("data", MODE_PRIVATE).edit();
                if (checkBoxComponent.isChecked()) {
                    editor.putString("account", account);
                    editor.putString("password", password);
                } else editor.clear();
                editor.apply();
                route();
            }
        });
    }

    private void isCheckedRememberPassword() {
        SharedPreferences pref = getSharedPreferences("data", MODE_PRIVATE);
        String account = pref.getString("account", "");
        String password = pref.getString("password", "");
        if (password.length() != 0) {
            accountComponent.setText(account);
            passwordComponent.setText(password);
            checkBoxComponent.setChecked(true);
        }
    }

    private void route() {
        Intent intent = new Intent(Login.this, Home.class);
        Toast.makeText(Login.this, "登录成功", Toast.LENGTH_SHORT).show();
        // 设置定时器, 延迟1s进入
        new Timer().schedule(new TimerTask() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        startActivity(intent);
                        finish();
                    }
                });
            }
        }, 1000);
    }
}