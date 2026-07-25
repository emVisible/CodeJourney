package com.example.prac15;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.os.Bundle;

import java.util.ArrayList;
import java.util.List;

public class ActivityCollector  {
    public static List<Activity> activityList = new ArrayList<>();

    public static void addActivity(Activity instance) {
        activityList.add(instance);
    }
    public static void removeActivity(Activity instance) {
        activityList.remove(instance);
    }
    public static void finishAll(){
        for (Activity activity:activityList){
            if (!activity.isFinishing()){
                activity.finish();
            }
        }
    }
}