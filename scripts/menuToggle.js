

openFilterMenu = () => {
    const filterSortContainer = document.querySelector('.sort-filter-container');
    const filterButton = document.querySelector('.sort-filter-button');
    if (filterSortContainer.style.display === 'none' || filterSortContainer.style.display === '') {
        filterSortContainer.style.display = 'block';
        filterButton.classList.add("clicked");

    } 
    else {
        filterSortContainer.style.display = 'none';
        filterButton.classList.remove("clicked");
    }
}
