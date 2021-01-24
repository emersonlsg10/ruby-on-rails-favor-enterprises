require "test_helper"

class EnterprisesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @enterprise = enterprises(:one)
  end

  test "should get index" do
    get enterprises_url, as: :json
    assert_response :success
  end

  test "should create enterprise" do
    assert_difference('Enterprise.count') do
      post enterprises_url, params: { enterprise: { id_enterprise: @enterprise.id_enterprise, is_like: @enterprise.is_like, name: @enterprise.name } }, as: :json
    end

    assert_response 201
  end

  test "should show enterprise" do
    get enterprise_url(@enterprise), as: :json
    assert_response :success
  end

  test "should update enterprise" do
    patch enterprise_url(@enterprise), params: { enterprise: { id_enterprise: @enterprise.id_enterprise, is_like: @enterprise.is_like, name: @enterprise.name } }, as: :json
    assert_response 200
  end

  test "should destroy enterprise" do
    assert_difference('Enterprise.count', -1) do
      delete enterprise_url(@enterprise), as: :json
    end

    assert_response 204
  end
end
