// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::Manager;

static mut GLOBAL_DOM_READY: bool = false;

#[tauri::command]
fn dom_started() {
    unsafe {
        GLOBAL_DOM_READY = true;
    }
}

#[tauri::command]
fn get_current_pid() -> u32 {
    std::process::id()
}

#[tauri::command]
fn find_process(sys_info: Option<serde_json::Value>, sys_pid: Option<i32>) -> Option<serde_json::Value> {
    if let (Some(sys_info), Some(sys_pid)) = (sys_info, sys_pid) {
        if let Some(processes) = sys_info["processes"].as_array() {
            for process in processes {
                if let Some(pid) = process["pid"].as_i64() {
                    if pid == sys_pid as i64 {
                        return Some(process.clone());
                    }
                }
            }
        }
    }
    None
}
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let splashscreen_window = app.get_window("splashscreen").unwrap();
            let main_window = app.get_window("main").unwrap();
            // we perform the initialization code on a new task so the app doesn't freeze
            tauri::async_runtime::spawn(async move {
                // Wait until GLOBAL_DOM_READY is true before continuing
                while !unsafe { GLOBAL_DOM_READY } {
                    std::thread::sleep(std::time::Duration::from_millis(200));
                }
                splashscreen_window.close().unwrap();
                main_window.show().unwrap();
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![dom_started, get_current_pid, find_process])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_system_info::init())
        .run(tauri::generate_context!())
        .expect("failed to run app");
}
