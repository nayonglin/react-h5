import jsonpPipe from 'jsonp-pipe';


var isTest = true;

export function fetchData(option) {
    return new Promise(function (resolve, reject){
        jsonpPipe({
            data: option,
            url: (isTest ? 'http://test.' : 'https://') + "activity.huya.com/questionnaire/index.php?m=Api&do=getQuestionnaire",
            success(res) {
              resolve(res);
            },
            fail(err){
                reject(err);
            }
        })
    }); 
}
