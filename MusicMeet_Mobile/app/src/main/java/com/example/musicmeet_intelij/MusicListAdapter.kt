
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.musicmeet_intelij.R
import com.example.musicmeet_intelij.melonimgurl

//api로  호출한 데이터와  list_photo_view로 만든 view를 연결하는 bridge 역할을 합니다.

class MusicListAdapter(val imgurl:ArrayList<melonimgurl>, val context: Context)
    : RecyclerView.Adapter<MusicListAdapter.ViewHolder>(){
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return MusicListAdapter.ViewHolder(
            LayoutInflater.from(context)
                .inflate(R.layout.recycler_view_music_list,parent ,false))

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(imgurl[position],context)
    }

    override fun getItemCount(): Int {
        return imgurl.count()
    }


    class ViewHolder (itemView: View? ) : RecyclerView.ViewHolder(itemView!!){

        val title = itemView?.findViewById<TextView>(R.id.title)
        val singer = itemView?.findViewById<TextView>(R.id.singer)
        val rank = itemView?.findViewById<TextView>(R.id.rank)
        val imgSrc = itemView?.findViewById<ImageView>(R.id.imgSrc)

        fun bind(itemsonginfo : melonimgurl? , context: Context){
            val urlString = imgSrc.toString()
            if(!urlString.isEmpty()){
                imgSrc?.setImageResource(R.mipmap.ic_launcher)

            }else{
                imgSrc?.visibility = View.GONE
            }

            title?.text = itemsonginfo?.title
            rank?.text = itemsonginfo?.rank
            singer?.text = itemsonginfo?.singer

         }


    }
}