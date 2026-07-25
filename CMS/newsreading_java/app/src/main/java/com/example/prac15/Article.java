package com.example.prac15;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.navigation.NavigationView;

public class Article extends BaseActivity {
    DrawerLayout drawerLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.article);
        initNavigator();
        bindNavigationEvent();
    }
    private void initNavigator() {
        Toolbar toolbar = findViewById(R.id.system_toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.drawer_layout);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setHomeAsUpIndicator(R.mipmap.more);
        }
    }
    @SuppressLint("NonConstantResourceId")
    private void bindNavigationEvent() {
        NavigationView nav = findViewById(R.id.nav_view);
        nav.setCheckedItem(R.id.nav_to_article);
        nav.setNavigationItemSelectedListener(item -> {
            drawerLayout.closeDrawers();
            switch (item.getItemId()) {
                case R.id.nav_to_home: {
                    Intent intent = new Intent("home");
                    startActivity(intent);
                    break;
                }
                case R.id.nav_to_article: {
                    Intent intent = new Intent("article");
                    startActivity(intent);
                    break;
                }
                case R.id.nav_logout:
                    Intent intent = new Intent("com.example.prac15.FORCE_OFFLINE");
                    sendBroadcast(intent);
                    break;
            }
            return true;
        });
    }
    @SuppressLint("NonConstantResourceId")
    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                this.drawerLayout.openDrawer(GravityCompat.START);
                break;
        }
        return true;
    }
}