import jsonpPipe from 'jsonp-pipe';


const IS_TEST = false;

export const fetchData = (option) =>  // 获取榜单信息
 ( new Promise((resolve, reject) => {
    jsonpPipe({
      data: option,
      cache: true,
      url: `${IS_TEST ? 'http://test.' : 'https://'}activity.huya.com/questionnaire/cache.php?m=Api&do=getTotalOptionsRank`,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  }));