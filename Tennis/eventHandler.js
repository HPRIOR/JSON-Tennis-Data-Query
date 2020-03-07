// this should listen for button press and contain the logic to query the JSon files

window.onload = function doEvent() {
    document.getElementById("submit").addEventListener('click', onClickSubmit)
    document.getElementById("reset").addEventListener('click', resetTable )
}