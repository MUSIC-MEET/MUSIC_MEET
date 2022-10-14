
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.musicmeet_intelij.R
import com.example.musicmeet_intelij.songType

//api로  호출한 데이터와  list_photo_view로 만든 view를 연결하는 bridge 역할을 합니다.

class MelonListAdapter(val imgurl:ArrayList<songType>, val context: Context)
    : RecyclerView.Adapter<MelonListAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return MelonListAdapter.ViewHolder(
            LayoutInflater.from(context)
                .inflate(R.layout.recycler_view_music_list, parent, false)
        )

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(imgurl[position], context)
    }

    override fun getItemCount(): Int {
        return imgurl.size
    }


    class ViewHolder(itemView: View?) : RecyclerView.ViewHolder(itemView!!) {

        val title = itemView?.findViewById<TextView>(R.id.title)
        val singer = itemView?.findViewById<TextView>(R.id.singer)
        val rank = itemView?.findViewById<TextView>(R.id.rank)
        val imgSrc = itemView?.findViewById<ImageView>(R.id.imgSrcimage)

        //url 앨범표지 안나옴 찾아볼것
        fun bind(itemsonginfo: songType, context: Context) {

            title?.text = itemsonginfo.title
            rank?.text = itemsonginfo.rank
            singer?.text = itemsonginfo.singer
            if (imgSrc != null) {
                Glide.with(itemView)
                    .load(itemsonginfo.imgSrc) // 불러올 이미지 url
                    .into(imgSrc)// 이미지를 넣을 뷰
                    /*.fallback(R.drawable.ic_closebox) // 로드할 url 이 비어있을(null 등) 경우 표시할 이미지*/

            }
        }
    }
}



