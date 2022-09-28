import android.app.Application
import android.content.Context
import androidx.appcompat.app.AppCompatActivity

//**토큰

//1. Preference Class 생성 후 preference 인스턴스를 생성
class Prefs(context: Context)
{
    private val prefNm = "token"
    private val prefs = context.getSharedPreferences(prefNm, AppCompatActivity.MODE_PRIVATE)

    //2. get set 메서드를 통해 관리
    var token:String?
        get() = prefs.getString("token",null)
        set(value){
            prefs.edit().putString("token",value).apply()
        }
}
//3. 효율적인 자원완리를 위해 싱글톤 패턴을 사용하고 가장 먼저 실행되기 위해 application을 상속받은 class에서 onCreate전에 초기화
class App: Application(){
    companion object{
        lateinit var prefs:Prefs
    }

    override fun onCreate() {
        prefs = Prefs(applicationContext)
        super.onCreate()
    }
}
