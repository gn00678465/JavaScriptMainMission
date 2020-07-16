export default {
  name: "modal",
  template: `
  <div
  class="modal fade"
  id="productModal"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-secondary">
        <h5 class="modal-title text-light" id="exampleModalLabel">
          產品
        </h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="container-fluid">
            <div class="row">
              <!-- img input -->
              <div class="col-4">
                <div class="form-group">
                  <label for="inputimgUrl">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputimgUrl"
                    placeholder="請輸入圖片網址"
                    v-model="input.imageUrl"
                  />
                </div>
                <img :src="input.imageUrl" alt="" class="img-fluid mt-3">
              </div>
              <div class="col">
                <div class="container-fluid">
                  <!-- title input -->
                  <div class="form-group">
                    <label for="inputTitle">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputTitle"
                      placeholder="請輸入標題"
                      v-model="input.title"
                    />
                  </div>
                  <!-- category & unit -->
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="inputCategory">分類</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputCategory"
                        placeholder="請輸入分類"
                        v-model="input.category"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="inputUnit">單位</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputUnit"
                        placeholder="請輸入單位"
                        v-model="input.unit"
                      />
                    </div>
                  </div>
                  <!-- price -->
                  <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputOrgPrice">原價</label>
                        <input
                          type="number"
                          class="form-control"
                          id="inputOrgPrice"
                          placeholder="請輸入原價"
                          v-model="input.origin_price"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPrice">售價</label>
                        <input
                          type="number"
                          class="form-control"
                          id="inputPrice"
                          placeholder="請輸入售價"
                          v-model="input.price"
                        />
                      </div>
                </div>
                <hr>
                  <!-- content -->
                    <div class="form-group">
                      <label for="inputDescript">產品描述</label>
                      <textarea class="form-control" id="inputDescript" rows="3" placeholder="請輸入產品描述"
                      v-model="input.description"></textarea>
                    </div>
                  <!-- descript -->
                    <div class="form-group">
                      <label for="inputContent">說明內容</label>
                      <textarea class="form-control" id="inputContent" rows="3" placeholder="請輸入說明內容" v-model="input.content"></textarea>
                    </div>
                    <!-- checkbox -->
                    <div class="form-row">
                      <div class="col">
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="checkEnable" v-model="input.enabled">
                          <label class="form-check-label" for="checkEnable">
                            是否啟用
                          </label>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-dismiss="modal"
        >
          取消
        </button>
        <button type="button" class="btn btn-outline-primary" @click.prevent="alertshow">
          確認
        </button>
      </div>
    </div>
  </div>
</div>
`,
data () {
  return {
    input: {}
  }
}
};
