package com.example.prac15;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.ContentValues;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class Registry extends AppCompatActivity {
    EditText account;
    EditText password;
    Button submit;
    TextView toLogin;
    Database db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registry);
        init();
    }

    protected void init() {
        this.toLogin = findViewById(R.id.to_login);
        this.account = findViewById(R.id.registry_account);
        this.password = findViewById(R.id.registry_password);
        this.submit = findViewById(R.id.registry_submit);
        this.db = Database.getInstance();
        this.toLogin.setOnClickListener(v -> {
            Intent intent = new Intent(Registry.this, Login.class);
            startActivity(intent);
            finish();
        });
        this.submit.setOnClickListener(v -> createUser());
    }

    protected void createUser() {
        SQLiteDatabase db = this.db.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("account", this.account.getText().toString());
        values.put("password", this.password.getText().toString());
        db.insert("user", null, values);
        Toast.makeText(this, "用户\"" + this.account.getText().toString() + "\"创建成功", Toast.LENGTH_SHORT).show();
    }

    protected void updateUser(String oldAccount, String newAccount) {
        SQLiteDatabase db = this.db.getWritableDatabase();
        ContentValues values = new ContentValues();
        values.put("account", newAccount);
        db.update("user", values, "account = ?", new String[]{oldAccount});
        Toast.makeText(this, "用户\"" + oldAccount + "\"修改名称成功", Toast.LENGTH_SHORT).show();
    }

    protected void deleteUser(String targetAccount) {
        SQLiteDatabase db = this.db.getWritableDatabase();
        db.delete("user", "account = ?", new String[]{targetAccount});
        Toast.makeText(this, "用户\"" + targetAccount + "\"删除用户成功", Toast.LENGTH_SHORT).show();
    }

    protected void deleteData(String targetAccount) {
        SQLiteDatabase db = this.db.getWritableDatabase();
        db.delete("user", "account = ?", new String[]{targetAccount});
        Toast.makeText(this, "用户\"" + targetAccount + "\"删除用户成功", Toast.LENGTH_SHORT).show();
    }

    protected void getUserInfo(String targetAccount) {
        SQLiteDatabase db = this.db.getWritableDatabase();
        Cursor cursor = db.query("user", null, null, null, null, null, null);
        ContentValues values = new ContentValues();
        if (cursor.moveToFirst()) {
            do {
                @SuppressLint("Range") String account = cursor.getString(cursor.getColumnIndex("account"));
                @SuppressLint("Range") String password = cursor.getString(cursor.getColumnIndex("password"));
                values.put("account", account);
                values.put("password", password);
                Log.d("DB", account);
                Log.d("DB", password);
            } while (cursor.moveToNext());
        }
        cursor.close();
        Toast.makeText(this, values.toString(), Toast.LENGTH_SHORT).show();
    }
}