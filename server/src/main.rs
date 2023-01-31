use std::collections::HashMap;

use actix_cors::Cors;
use actix_web::{http, middleware, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize, Deserialize, Debug, Clone)]
struct File {
    #[serde(rename = "ID")]
    id: u32,
    #[serde(rename = "Name and last Name")]
    full_name: Option<String>,
    #[serde(rename = "Date Required")]
    date_required: String,

    /// Categories
    #[serde(rename = "Hot Meals (Individually Prepared)")]
    hot_meals: Option<String>,
    #[serde(rename = "Filled Backed Jacket Potatoes (with salad garnish)")]
    filled_jacket_potatoes: Option<String>,
    #[serde(rename = "\"Hand Cut Farmhouse Sandwiches \"")]
    hand_cut_sandwiches: Option<String>,
    #[serde(rename = "\"Salads Individually prepared and packed \"")]
    salads_individual: Option<String>,
    #[serde(rename = "Sandwich Salad")]
    sandwich_salad: Option<String>,

    #[serde(rename = "\"Accompaniments \"")]
    accompaniments: Option<String>,

    //Dietary requirements on all food
    #[serde(rename = "\"Any dietary requirements \"")]
    dietary_requirements: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct Categories {
    #[serde(rename = "Hot Meals (Individually Prepared)")]
    hot_meals: Option<String>,
    #[serde(rename = "Filled Backed Jacket Potatoes (with salad garnish)")]
    filled_jacket_potatoes: Option<String>,
    #[serde(rename = "\"Hand Cut Farmhouse Sandwiches \"")]
    hand_cut_sandwiches: Option<String>,
    #[serde(rename = "\"Salads Individually prepared and packed \"")]
    salads_individual: Option<String>,
    #[serde(rename = "Sandwich Salad")]
    sandwich_salad: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct ParseFile {
    date: String,
    file: Vec<File>,
}

fn filter_by_date(file: Vec<File>, date: String) -> Vec<File> {
    let mut filtered_file: Vec<File> = vec![];
    for item in file.into_iter() {
        if item.date_required == date {
            filtered_file.push(item)
        }
    }
    return filtered_file;
}

fn sort_by_categories(filtered_file: Vec<File>, categories: Categories) -> Vec<Value> {
    let mut sorted_file: Vec<Value> = vec![];
    let iterable_headers: HashMap<String, Option<String>> =
        serde_json::from_value(serde_json::to_value(&categories).unwrap()).unwrap();
    for (key, _) in &iterable_headers {
        for item in &filtered_file {
            let json_item = json!(item);
            if key == "Salads Individually prepared and packed " && item.id == 5527 {
                println!("12");
                println!("{item:#?}");
            }
            if json_item[key] != serde_json::Value::Null {
                let mut file = json!({});
                file["ID"] = json!(item.id);
                file["Name and last Name"] = json!(item.full_name);
                file["Accompaniments "] = json!(item.accompaniments);
                file["Any dietary requirements "] = json!(item.dietary_requirements);
                file[key] = json_item[key].to_owned();
                sorted_file.push(file);
                println!("{key:#?}");
            }
        }
    }
    return sorted_file;
}

#[derive(Serialize, Deserialize, Debug)]
struct Response {
    data: Vec<Value>,
    length: usize,
}

#[derive(Serialize, Deserialize, Debug)]
struct TestResponse {
    data: Vec<File>,
    length: usize,
}

#[post("/parse-file")]
async fn parse_file(data: web::Json<ParseFile>) -> impl Responder {
    let filtered_file = filter_by_date(data.0.file.clone(), data.0.date);
    let categories = Categories {
        filled_jacket_potatoes: None,
        hand_cut_sandwiches: None,
        hot_meals: None,
        salads_individual: None,
        sandwich_salad: None,
    };
    let sorted_file = sort_by_categories(filtered_file.clone(), categories);
    let response = Response {
        data: sorted_file.clone(),
        length: sorted_file.len(),
    };
    return HttpResponse::Ok().body(json!(response).to_string());
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5174")
            .allowed_methods(vec!["GET", "POST", "PUT"])
            .allowed_headers(vec![
                http::header::AUTHORIZATION,
                http::header::ACCEPT,
                http::header::CONTENT_TYPE,
            ])
            .max_age(3600);
        App::new()
            .wrap(middleware::Compress::default())
            .wrap(cors)
            .service(parse_file)
    })
    .bind(("127.0.0.1", 4000))?
    .run()
    .await
}
