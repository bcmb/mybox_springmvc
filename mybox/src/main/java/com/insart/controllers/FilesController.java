package com.insart.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/files")
public class FilesController {
	
	@RequestMapping("get")
	@ResponseBody
	public String getFiles(ModelMap model) {
		return "not_json";
	}
	
}
