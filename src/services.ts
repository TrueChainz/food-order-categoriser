// fn filter_by_date(file: Vec<File>, date: String) -> Vec<File> {
//   let mut filtered_file: Vec<File> = vec![];
//   for item in file.into_iter() {
//       if item.date_required == date {
//           filtered_file.push(item)
//       }
//   }
//   return filtered_file;
// }

// fn sort_by_categories(filtered_file: Vec<File>, categories: Categories) -> Vec<Value> {
//   let mut sorted_file: Vec<Value> = vec![];
//   let iterable_headers: HashMap<String, Option<String>> =
//       serde_json::from_value(serde_json::to_value(&categories).unwrap()).unwrap();
//   for (key, _) in &iterable_headers {
//       for item in &filtered_file {
//           let json_item = json!(item);
//           if key == "Salads Individually prepared and packed " && item.id == 5527 {
//               println!("12");
//               println!("{item:#?}");
//           }
//           if json_item[key] != serde_json::Value::Null {
//               let mut file = json!({});
//               file["ID"] = json!(item.id);
//               file["Name and last Name"] = json!(item.full_name);
//               file["Accompaniments "] = json!(item.accompaniments);
//               file["Any dietary requirements "] = json!(item.dietary_requirements);
//               file[key] = json_item[key].to_owned();
//               sorted_file.push(file);
//               println!("{key:#?}");
//           }
//       }
//   }
//   return sorted_file;
// }

export function filterByDate(file: any[], date: string) {
  let filteredFile: any[] = [];
  for (let item of file) {
    if (item["Date Required"] == date) {
      filteredFile.push(item);
    }
  }
  return filteredFile;
}

export const CATEGORIES = [
  "Hot Meals (Individually Prepared)",
  '"Hand Cut Farmhouse Sandwiches "',
  "Filled Backed Jacket Potatoes (with salad garnish)",
  '["Salads Individually prepared and packed "]',
  "Sandwich Salad",
];

export function sortByCategories(filteredFile: any[], categories: any[]) {
  let hashedIds = new Set();
  let sortedFile: any[] = [];
  for (let category of categories) {
    for (let item of filteredFile) {
      if (item[category]) {
        if (hashedIds.has(item["ID"])) {
          delete item['"Accompaniments "'];
        }
        const newItem: any = {
          ID: item["ID"],
          "Name and last name": item["Name and last name"],
        };
        newItem[category] = item[category];
        sortedFile.push(newItem);

        hashedIds.add(item["ID"]);
      }
    }
  }
  return sortedFile;
}
