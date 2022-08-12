package com.example.music_meet.controller;

import com.example.music_meet.dto.ResponseChart;
import com.example.music_meet.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@CrossOrigin("*")
@Slf4j
public class LiveChartController {

    @Autowired
    private UserService userService;



    //
    // 차트 호출
    //
    @RequestMapping(path = "/livechart/{site}/{rank}", method = RequestMethod.GET)
    public ResponseEntity<Object> callChart(@PathVariable("site") String site, @PathVariable("rank") String rank)
    {
        String siteCode = null;

        if (site.equals("melon"))
            siteCode = "1";
        else if (site.equals("genie"))
            siteCode = "2";
        else if (site.equals("bugs"))
            siteCode = "3";
        else if (site.equals("flo")) {
            siteCode = "4";
        } else
        {return new ResponseEntity<>(HttpStatus.BAD_REQUEST);}

        ResponseChart responseChart = userService.getChart(siteCode, rank);

        return new ResponseEntity<>(responseChart, HttpStatus.OK);
    }
}
