package com.insart.services;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import com.insart.model.Node;

public class FileExplorerImpl {

	private boolean afterEmpty;

	public static final String ROOT_PATH = "D:\\sandbox\\";
	private List<Node> dirFiles = new ArrayList();
	private List<Node> allFiles = new ArrayList();

	public FileExplorerImpl() {
		analyseFsRecursively(new File(ROOT_PATH));
		init();
	}

	public List<Node> getDirFiles() {
		return dirFiles;
	}

	public void init() {
		File fs = new File(ROOT_PATH);
		for (File f : fs.listFiles()) {
			dirFiles.add(new Node(f.getName(), f.getAbsolutePath(), f.isDirectory()));
		}

	}

	public List<Node> goBack(File path) {
		dirFiles.clear();
		for (File f : path.listFiles()) {
			dirFiles.add(new Node(f.getName(), f.getAbsolutePath(), f.isDirectory()));
		}
		return dirFiles;
	}

	private void analyseFsRecursively(File fs) {
		for (File f : fs.listFiles()) {
			if (f.isDirectory()) {
				allFiles.add(new Node(f.getName(), f.getAbsolutePath(), f.isFile()));
				analyseFsRecursively(f);
			} else {
				allFiles.add(new Node(f.getName(), f.getAbsolutePath(), f.isFile()));
			}
		}
	}

	public List<Node> getDirFiles(String file) {
		if (!file.contains("back")) {
			for (Node node : dirFiles) {
				if (node.getName().equals(file) & node.isDirectory()) {
					if (node.isDirectory()) {
						if (new File(node.getPath()).listFiles().length == 0) {
							List<Node> result = new ArrayList(1);
							result.add(new Node(true, node.getPath()));
							afterEmpty = true;
							return result;
						}
						dirFiles.clear();
						for (File f : new File(node.getPath()).listFiles()) {
							dirFiles.add(new Node(f.getName(), f.getPath(), f.isDirectory()));
						}
						return dirFiles;
					}

				} else if (node.getName().equals(file)) {
					List<Node> result = new ArrayList(1);
					result.add(node);
					return result;
				}
			}

		} else {
			File parentFile = null;
			if (!afterEmpty) {
				parentFile = new File(dirFiles.get(0).getPath()).getParentFile().getParentFile();
			} else {
				parentFile = new File(dirFiles.get(0).getPath()).getParentFile();
				afterEmpty = false;
			}
			if (parentFile != null) {
				goBack(parentFile);
			} else {
				return dirFiles;
			}
		}
		return dirFiles;
	}

	public List<Node> createFolder(String name) {
		Node n = dirFiles.get(0);
		String path = n.getPath().substring(0, (n.getPath().lastIndexOf('\\')) + 1) + "\\" + name;
		String path2 = path.substring(0, path.lastIndexOf('\\')) + name;
		File file = new File(path2);
		file.mkdir();
		dirFiles.add(0, new Node(file.getName(), file.getAbsolutePath(), true));
		return dirFiles;
	}
}
