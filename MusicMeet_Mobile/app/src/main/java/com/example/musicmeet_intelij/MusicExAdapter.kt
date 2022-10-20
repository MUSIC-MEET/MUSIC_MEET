package com.example.musicmeet_intelij

import android.content.Context
import android.widget.ArrayAdapter
import android.widget.Filter
import android.widget.Filterable

class MusicExAdapter(context: Context, resource: Int) : ArrayAdapter<String>(context, resource), Filterable {
    private var suggests: MutableList<String> = mutableListOf()

    fun setSuggests(list: List<String>) {
        suggests.clear()
        suggests.addAll(list)
    }

    override fun getCount(): Int {
        return suggests.size
    }

    override fun getItem(position: Int): String? {
        return suggests[position]
    }

    override fun getFilter(): Filter {
        return object : Filter() {
            override fun performFiltering(constraint: CharSequence?): FilterResults {
                val filterResults = FilterResults()

                if (constraint != null) {
                    filterResults.apply {
                        values = suggests
                        count = suggests.size
                    }
                }
                return filterResults
            }
            override fun publishResults(constraint: CharSequence?, results: FilterResults?) {
                if (results != null && results.count > 0) {
                    notifyDataSetChanged()
                } else {
                    notifyDataSetInvalidated()
                }
            }
        }
    }
}