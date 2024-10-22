package sa.edu.ub;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.*;

import java.util.List;

public class MockLocationDetectorModule extends ReactContextBaseJavaModule {
    MockLocationDetectorModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "MockLocationDetector";
    }

    @ReactMethod
    public void isRooted(Promise promise) {
        boolean isRooted = checkRootMethod1() || checkRootMethod2();
        promise.resolve(isRooted);
    }

    private boolean checkRootMethod1() {
        if (Settings.Secure.getString(getReactApplicationContext().getContentResolver(),
                Settings.Secure.ALLOW_MOCK_LOCATION).equals("0"))
            return areThereMockPermissionApps(getReactApplicationContext());
        else
            return true;
    }

    private boolean checkRootMethod2() {
        // Implement additional root checking logic
        return false; // Placeholder
    }

    public static boolean areThereMockPermissionApps(Context context) {
        int count = 0;

        PackageManager pm = context.getPackageManager();
        List<ApplicationInfo> packages =
                pm.getInstalledApplications(PackageManager.GET_META_DATA);

        for (ApplicationInfo applicationInfo : packages) {
            try {
                PackageInfo packageInfo = pm.getPackageInfo(applicationInfo.packageName,
                        PackageManager.GET_PERMISSIONS);

                // Get Permissions
                String[] requestedPermissions = packageInfo.requestedPermissions;

                if (requestedPermissions != null) {
                    for (int i = 0; i < requestedPermissions.length; i++) {
                        if (requestedPermissions[i]
                                .equals("android.permission.ACCESS_MOCK_LOCATION")
                                && !applicationInfo.packageName.equals(context.getPackageName())) {
                            count++;
                        }
                    }
                }
            } catch (PackageManager.NameNotFoundException e) {
                Log.e("Got exception " , e.getMessage());
            }
        }

        if (count > 0)
            return true;
        return false;
    }
}
