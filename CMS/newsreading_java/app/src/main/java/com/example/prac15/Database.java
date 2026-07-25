package com.example.prac15;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.widget.Toast;

import androidx.annotation.Nullable;

public class Database extends SQLiteOpenHelper {
    private Context databaseContext;
    private static Database instance;

    public static final String CREATE_USER_TABLE = "Create table user("
            + "id integer primary key autoincrement,"
            + "account text,"
            + "password text)";

    public static synchronized Database getInstance() {
        return instance;
    }
    public static synchronized Database getInstance(Context context, String name ,@Nullable SQLiteDatabase.CursorFactory factory, int version) {
        if (instance == null) {
            instance = new Database(context, name, factory, version);
        }
        return instance;
    }
    public Database(@Nullable Context context, @Nullable String name, @Nullable SQLiteDatabase.CursorFactory factory, int version) {
        super(context, name, factory, version);
        databaseContext = context;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        db.execSQL(CREATE_USER_TABLE);
        Toast.makeText(databaseContext, "[System] 数据创建完毕", Toast.LENGTH_LONG).show();
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("drop table if exists user");
        onCreate(db);
    }
}
