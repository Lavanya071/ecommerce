export default function basicOps(products,searchTerm,sortDir,currCategory,pageSize,pageNum){
    let filteredArr=products;
if (searchTerm !== ""){
  filteredArr=filteredArr.filter((pro)=>{
    let lowerSearchTerm=searchTerm.toLowerCase();
    let lowerTitle=pro.title.toLowerCase();
    return lowerTitle.includes(lowerSearchTerm);
  });
  
}

let filteredSort=filteredArr;
if (sortDir !==0){
  if (sortDir==1){
          filteredSort=filteredSort.sort(inComparator); 
  }else{
          filteredSort=filteredSort.sort(deComparator);
  }
}


let filteredCategory=filteredSort;

if (currCategory  !== "All Categories"){
  filteredCategory = filteredCategory.filter((produ)=>{
    return produ.category==currCategory;
  }); 
  console.log(filteredCategory.price);
}
let totalPages=Math.ceil(filteredCategory.length/pageSize) ; 
let sidx=(pageNum-1) * pageSize
let eidx=sidx+pageSize;
filteredCategory=filteredCategory.slice(sidx,eidx);
return {filteredCategory,totalPages}
}



function inComparator(product1,product2) {
    if(product1.price>product2.price){
       return 1;
    }else{
      return -1;
    }
}
function deComparator(product1,product2){
if (product1.price<product2.price){
return 1
}else{
 return -1 
}
}

