package com.insart.model;

public class Node {
	private String path;
	private String name;
	private boolean isDirectory;
	private boolean isEmptyDir;
	
	public Node(String name, String path, boolean isDirectory) {
		this.name = name;
		this.path = path;
		this.isDirectory = isDirectory;	
	}
	
	public Node(boolean isEmptyDir, String path) {
		this.path = path;
		this.isEmptyDir = isEmptyDir;
	}
		
	public boolean isDirectory() {
		return isDirectory;
	}
	public void setDirectory(boolean isDirectory) {
		this.isDirectory = isDirectory;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isEmptyDir() {
		return isEmptyDir;
	}
	public void setEmptyDir(boolean isEmptyDir) {
		this.isEmptyDir = isEmptyDir;
	}
}
