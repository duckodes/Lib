function updateElapsedTime() {
    const currentTime = Date.now();
    const elapsedTime = (currentTime - startTime) / 1000;
    console.log('已經過去的時間（秒）：', elapsedTime);
}