/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Griefing_GloryToUkraine.ts":
/*!*************************************!*\
  !*** ./src/Griefing_GloryToUkraine.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

    let GloryToUkraine = {};
    var mamaSorry;
    (function (mamaSorry) {
        const path = ['Custom Scripts', 'Griefing'];
        let myHero, myPlayer;
        let ENABLE = Menu.AddToggle([...path, 'GloryToUkraine'], 'Enable', false)
            .SetNameLocale('ru', 'Включить')
            .OnChange(state => {
            ENABLE = state.newValue;
        })
            .GetValue();
        Menu.GetFolder(path).SetImage('~/menu/40x40/grief.png');
        let ENABLE_Kill = Menu.AddToggle([...path, 'GloryToUkraine'], 'Send when killing', false)
            .SetNameLocale('ru', 'Отправлять при убийстве')
            .OnChange(state => {
            ENABLE_Kill = state.newValue;
        })
            .GetValue();
        let ENABLE_Die = Menu.AddToggle([...path, 'GloryToUkraine'], 'Send at death', false)
            .SetNameLocale('ru', 'Отправлять при смерти')
            .OnChange(state => {
            ENABLE_Die = state.newValue;
        })
            .GetValue();
        let Bind_AllChat = Menu.AddKeyBind([...path, 'GloryToUkraine'], 'Bind (All Chat)', Enum.ButtonCode.KEY_NONE).SetNameLocale('ru', 'Бинд (общий чат)');
        let Bind_AllyChat = Menu.AddKeyBind([...path, 'GloryToUkraine'], 'Bind (Ally Chat)', Enum.ButtonCode.KEY_NONE).SetNameLocale('ru', 'Бинд (союзный чат)');
        GloryToUkraine.OnUpdate = () => {
            if (!myHero || !ENABLE)
                return;
            if (Bind_AllChat.IsKeyDownOnce()) {
                SendPhrases();
            }
            if (Bind_AllyChat.IsKeyDownOnce()) {
                SendPhrases(true);
            }
        };
        GloryToUkraine.OnFireEvent = (e) => {
            if (!myHero || !ENABLE)
                return;
            if (e.name == 'dota_player_kill') {
                if (ENABLE_Kill && myPlayer.GetPlayerID() == e.GetInt('killer1_userid')) {
                    SendPhrases();
                }
                if (ENABLE_Die && myPlayer.GetPlayerID() == e.GetInt('victim_userid')) {
                    SendPhrases();
                }
            }
        };
        GloryToUkraine.OnScriptLoad = GloryToUkraine.OnGameStart = () => {
            myHero = EntitySystem.GetLocalHero();
            if (myHero) {
                myPlayer = EntitySystem.GetLocalPlayer();
            }
        };
       GloryToUkraine.OnGameEnd = () => {
            myHero = null;
        };
        RegisterScript(GloryToUkraine);
        function SendPhrases(allyChat = false, index = null) {
            Chat.Say(allyChat ? 'DOTAChannelType_GameAllies' : 'DOTAChannelType_GameAll', allPhrases[index ? index : Math.floor(Math.random() * allPhrases.length)]);
        }
        let allPhrases = [
            
            'Слава Україні!',
            'Героям Слава!',
            'Слава Нації',
            'Смерть ворогам',
            'Україна- понад усе',
            'Путин - хуйло',
        ];
    })(mamaSorry || (mamaSorry = {}));
    
    
    /***/ }),
    
    /***/ 0:
    /*!*******************************************!*\
      !*** multi ./src/Griefing_GloryToUkraine.ts ***!
      \*******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__(/*! ./src/Griefing_GloryToUkraine.ts */"./src/Griefing_GloryToUkraine.ts");
    
    
    /***/ })
    
    /******/ });
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0dyaWVmaW5nX01BTUtPRUI4MDAwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxJQUFJLFdBQVcsR0FBc0IsRUFBRSxDQUFDO0FBRXhDLElBQVUsU0FBUyxDQXloQ2xCO0FBemhDRCxXQUFVLFNBQVM7SUFDbEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1QyxJQUFJLE1BQU0sRUFBRSxRQUFRLENBQUM7SUFFckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7U0FDcEUsYUFBYSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUM7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RkFBZ0Y7UUFDaEYsOEVBQThFO1FBQzlFLDhGQUE4RjtRQUM5RixvRUFBb0U7UUFDcEUscURBQXFEO1FBQ3JELG9HQUFvRztRQUNwRyx5RkFBeUY7UUFDekYsbUVBQW1FO1FBQ25FLDJHQUEyRztRQUMzRyxvREFBb0Q7UUFDcEQsaURBQWlEO1FBQ2pELCtDQUErQztRQUMvQyx3SEFBd0g7UUFDeEgsNEZBQTRGO1FBQzVGLHFFQUFxRTtRQUNyRSwwQ0FBMEM7UUFDMUMsOEVBQThFO1FBQzlFLDJEQUEyRDtRQUMzRCx3REFBd0Q7UUFDeEQsNEVBQTRFO1FBQzVFLCtEQUErRDtRQUMvRCxzREFBc0Q7UUFDdEQsc0VBQXNFO1FBQ3RFLDBFQUEwRTtRQUMxRSw2Q0FBNkM7UUFDN0Msb0NBQW9DO1FBQ3BDLG9EQUFvRDtRQUNwRCw4REFBOEQ7UUFDOUQsNkRBQTZEO1FBQzdELG9GQUFvRjtRQUNwRixxRkFBcUY7UUFDckYsK0NBQStDO1FBQy9DLCtHQUErRztRQUMvRyx3SEFBd0g7UUFDeEgscUZBQXFGO1FBQ3JGLGtFQUFrRTtRQUNsRSx1REFBdUQ7UUFDdkQsd0VBQXdFO1FBQ3hFLGlJQUFpSTtRQUNqSSw2SkFBNko7UUFDN0osaUVBQWlFO1FBQ2pFLG1EQUFtRDtRQUNuRCxzREFBc0Q7UUFDdEQsd0RBQXdEO1FBQ3hELHFEQUFxRDtRQUNyRCxnRUFBZ0U7UUFDaEUsOEdBQThHO1FBQzlHLG9HQUFvRztRQUNwRyxnRUFBZ0U7UUFDaEUsa0ZBQWtGO1FBQ2xGLDhHQUE4RztRQUM5RyxrRUFBa0U7UUFDbEUsZ0tBQWdLO1FBQ2hLLG1MQUFtTDtRQUNuTCxxRkFBcUY7UUFDckYsc0dBQXNHO1FBQ3RHLHdJQUF3STtRQUN4SSxpSUFBaUk7UUFDakkseUdBQXlHO1FBQ3pHLHdJQUF3STtRQUN4SSxxSUFBcUk7UUFDckksNkhBQTZIO1FBQzdILDRGQUE0RjtRQUM1RixtRkFBbUY7UUFDbkYsb0RBQW9EO1FBQ3BELGlEQUFpRDtRQUNqRCxtREFBbUQ7UUFDbkQseUlBQXlJO1FBQ3pJLDJLQUEySztRQUMzSyxpRUFBaUU7UUFDakUsNENBQTRDO1FBQzVDLHlDQUF5QztRQUN6Qyx1SUFBdUk7UUFDdkksd0RBQXdEO1FBQ3hELDhEQUE4RDtRQUM5RCxpRUFBaUU7UUFDakUsMENBQTBDO1FBQzFDLGlGQUFpRjtRQUNqRiwrREFBK0Q7UUFDL0QsNEVBQTRFO1FBQzVFLGlFQUFpRTtRQUNqRSxNQUFNO1FBQ04sa0JBQWtCO1FBQ2xCLGdFQUFnRTtRQUNoRSxNQUFNO1FBQ04sZUFBZTtRQUNmLE1BQU07UUFDTiw2QkFBNkI7UUFDN0IsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQiw4QkFBOEI7UUFDOUIsVUFBVTtRQUNWLGdDQUFnQztRQUNoQyxXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLHdDQUF3QztRQUN4Qyx1Q0FBdUM7UUFDdkMsNkNBQTZDO1FBQzdDLEtBQUs7S0FDTCxDQUFDO0FBQ0gsQ0FBQyxFQXpoQ1MsU0FBUyxLQUFULFNBQVMsUUF5aENsQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VSb290IjoiIn0=